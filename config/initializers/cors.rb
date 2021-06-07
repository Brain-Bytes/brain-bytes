Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # allow do
  #   origins '*'
  #   resource '*', headers: :any, methods: %i[get post patch put delete]
  # end
  allow do
    origins '*'
    resource '*',
      headers: %w(Authorization),
      methods: :any,
      expose: %w(Authorization),
      max_age: 600
  end
end
