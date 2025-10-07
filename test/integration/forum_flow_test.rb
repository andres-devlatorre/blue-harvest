require "test_helper"

class ForumFlowTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @creator = User.create!(email: "creator@example.com", password: "password")
    @other_user = User.create!(email: "reader@example.com", password: "password")

    @subforum = Subforum.create!(name: "Support", description: "Helping each other")
    @post = Post.create!(title: "Original", content: "Content", user: @creator, subforum: @subforum)
  end

  test "signed in user can create subforum" do
    sign_in @creator

    assert_difference "Subforum.count", 1 do
      post subforums_path, params: { subforum: { name: "New Space", description: "For everyone" } }
    end

    assert_redirected_to subforum_path(Subforum.last)
  end

  test "unauthenticated user cannot create subforum" do
    assert_no_difference "Subforum.count" do
      post subforums_path, params: { subforum: { name: "Forbidden", description: "Nope" } }
    end

    assert_redirected_to root_path
    assert_equal "You are not authorized to perform this action.", flash[:alert]
  end

  test "post owner can update their post" do
    sign_in @creator

    patch subforum_post_path(@subforum, @post), params: { post: { title: "Updated" } }

    assert_redirected_to post_path(@post)
    assert_equal "Updated", @post.reload.title
  end

  test "non owner cannot update someone else's post" do
    sign_in @other_user

    patch subforum_post_path(@subforum, @post), params: { post: { title: "Intrusion" } }

    assert_redirected_to root_path
    assert_equal "You are not authorized to perform this action.", flash[:alert]
    assert_equal "Original", @post.reload.title
  end
end
