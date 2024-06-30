class CommentsController < ApplicationController
  before_action :set_comment, only: %i[destroy]
  before_action :authenticate_user!

  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)
    @comment.post = @post
    @comment.user = current_user
    if @comment.save
      redirect_to subforum_post_path(@post.subforum, @post)
    else
      render 'posts/show', status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    redirect_to subforum_post_path(@comment.post.subforum, @comment.post)
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
