class SessionsController < Devise::SessionsController
  skip_forgery_protection

  private

  def respond_with(resource, _opts = {})
    render json: UserSerializer.new(resource).serializable_hash.to_json
  end

  def respond_to_on_destroy
    head :no_content
  end
end
