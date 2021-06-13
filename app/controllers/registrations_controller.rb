class RegistrationsController < Devise::RegistrationsController
  skip_forgery_protection
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: { message: 'Signed up sucessfully.', userId: current_user.id }
  end

  def register_failed
    render json: { message: 'Something went wrong.' }
  end
end
