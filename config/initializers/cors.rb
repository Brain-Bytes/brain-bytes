Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001', 'https://brainbytes.dev'
    resource '*',
      headers: %w(Authorization),
      methods: :any,
      expose: %w(Authorization),
      max_age: 600
  end
end
