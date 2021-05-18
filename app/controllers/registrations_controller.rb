class RegistrationsController < Devise::RegistrationsController
  skip_forgery_protection

  def create
    build_resource(sign_up_params)
    p 'SIGN UP PARAMS'
    p sign_up_params
    resource.save
    if resource.save
      sign_up(resource_name, resource) if resource.persisted?
      render json: UserSerializer.new(resource).serializable_hash.to_json
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end
end
