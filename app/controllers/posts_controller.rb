class PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[show]
  before_action :set_post, only: %i[show edit update destroy]
  before_action :set_subforum, only: %i[new create]

  def show
    authorize @post
    @comments = @post.comments.order(created_at: :desc)
    @comment = Comment.new
  end

  def new
    @subforum = Subforum.find(params[:subforum_id])
    @post = Post.new
    authorize @post
  end

  def create
    @post = Post.new(post_params)
    @post.subforum = @subforum
    @post.user = current_user
    authorize @post
    if @post.save
      redirect_to subforum_post_path(@subforum, @post)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    authorize @post
  end

  def update
    authorize @post
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @post
    @post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :subforum_id, files: [])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def set_subforum
    @subforum = Subforum.find(params[:subforum_id])
  end
end
