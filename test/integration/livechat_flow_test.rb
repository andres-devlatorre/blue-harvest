require "test_helper"

class LivechatFlowTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = User.create!(email: "participant@example.com", password: "password")
    @partner = User.create!(email: "partner@example.com", password: "password")
    @outsider = User.create!(email: "outsider@example.com", password: "password")

    @livechat = Livechat.create!(participant1: @user, participant2: @partner, status: "active")
  end

  test "participants can view the livechat" do
    sign_in @user

    get livechat_path(@livechat)

    assert_response :success
    assert_select "h5", text: "Video Room"
  end

  test "non participants cannot view the livechat" do
    sign_in @outsider

    get livechat_path(@livechat)

    assert_redirected_to root_path
    assert_equal "You are not authorized to perform this action.", flash[:alert]
  end

  test "non participants cannot post messages" do
    sign_in @outsider

    assert_no_difference "Message.count" do
      post livechat_messages_path(@livechat), params: { message: { content: "Hello" } }
    end

    assert_redirected_to root_path
    assert_equal "You are not authorized to perform this action.", flash[:alert]
  end
end
