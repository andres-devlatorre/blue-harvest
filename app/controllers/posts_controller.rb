class PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[show]
  before_action :set_post, only: %i[show edit update destroy]
  before_action :set_subforum, only: %i[new create]

  def show
    @comments = @post.comments
    @comment = Comment.new
  end

  def new
    @subforum = Subforum.find(params[:subforum_id])
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.subforum = @subforum
    @post.user = current_user
    if @post.save
      redirect_to subforum_post_path(@subforum, @post)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :subforum_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def set_subforum
    @subforum = Subforum.find(params[:subforum_id])
  end
end
