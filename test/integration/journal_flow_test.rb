require "test_helper"

class JournalFlowTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = User.create!(email: "writer@example.com", password: "password")
    @other_user = User.create!(email: "other@example.com", password: "password")

    @user_journal = Journal.create!(title: "My Day", content: "Reflections", user: @user)
    @other_journal = Journal.create!(title: "Private", content: "Secret", user: @other_user)
  end

  test "user sees only own journals on index" do
    sign_in @user

    get journals_path

    assert_response :success
    assert_match @user_journal.title, response.body
    refute_match @other_journal.title, response.body
  end

  test "user cannot view another users journal" do
    sign_in @user

    get journal_path(@other_journal)

    assert_redirected_to root_path
    assert_equal "You are not authorized to perform this action.", flash[:alert]
  end

  test "user can create a journal entry" do
    sign_in @user

    assert_difference "Journal.count", 1 do
      post journals_path, params: { journal: { title: "New Entry", content: "Content" } }
    end

    assert_redirected_to journals_path
    follow_redirect!
    assert_match "New Entry", response.body
  end
end
