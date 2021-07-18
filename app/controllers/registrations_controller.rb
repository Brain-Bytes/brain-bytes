class RegistrationsController < Devise::RegistrationsController
  skip_forgery_protection
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    RefreshToken.create!(user: current_user)
    render json: { message: 'Signed up sucessfully.', userId: current_user.id, refreshToken: current_user.refresh_token.crypted_token }
  end

  def register_failed
    render json: { message: resource.errors.full_messages.to_sentence }, status: 404
  end
end
