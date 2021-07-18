class SessionsController < Devise::SessionsController
  skip_forgery_protection
  respond_to :json

  private

  def respond_with(_resource, _opts = {})
    if !current_user.refresh_token
      RefreshToken.create!(user: current_user)
    end
    render json: { message: 'You are logged in.', userId: current_user.id, refreshToken: current_user.refresh_token.crypted_token }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: 'You are logged out.' }, status: :ok
  end

  def log_out_failure
    render json: { message: 'Hmm nothing happened.' }, status: :unauthorized
  end
end
