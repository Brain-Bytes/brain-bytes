module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :fetch_bytes, resolver: Queries::FetchBytes
    field :fetch_byte, resolver: Queries::FetchByte
    field :fetch_older_bytes, resolver: Queries::FetchOlderBytes
    field :fetch_user, resolver: Queries::FetchUser
    field :fetch_tags, resolver: Queries::FetchTags
    field :fetch_likes, resolver: Queries::FetchLikes
  end
end
