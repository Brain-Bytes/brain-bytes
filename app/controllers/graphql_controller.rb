class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  protect_from_forgery with: :null_session

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      # Query context goes here, for example:
      current_user: check_current_user
    }
    result = BrainBytesBackendSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development(e)
  end

  private

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  private

  def check_current_user
    if authorization_headers_present
      begin
        token = authorization_header
        decoded_token = JWT.decode(token, ENV["DEVISE_JWT_SECRET_KEY"], true, verify_iat: true)[0]
        user_id = get_user_id_from_token(decoded_token)
        user = User.find(user_id)
      rescue JWT::ExpiredSignature
        refresh_token = params[:refresh_token]
        user = RefreshToken.find_by(crypted_token: refresh_token).user
        new_jwt_token = issue_new_jwt_token(user.id)
        response.set_header("Authorization", new_jwt_token)
        user
      end
    end
  end

  def authorization_headers_present
    request.headers['Authorization'] && request.headers['Authorization'] != "null"
  end

  def authorization_header
    request.headers['Authorization']&.split('Bearer ')&.last
  end

  def get_user_id_from_token(decoded_token)
    decoded_token["sub"] || decoded_token["user_id"]
  end

  def issue_new_jwt_token(user_id)
    JWT.encode(
      {
        user_id: user_id,
        iat: Time.now.to_i,
        exp: (Time.now + 2.hours).to_i,
      },
      ENV["DEVISE_JWT_SECRET_KEY"]
    )
  end

end
