# db/seeds.rb

puts 'Cleaning database...'

Message.destroy_all
Livechat.destroy_all
Comment.destroy_all
Post.destroy_all
Subforum.destroy_all
Journal.destroy_all
Call.destroy_all
User.destroy_all

$redis&.del('online_users')

puts 'Seeding users...'
first_names = %w[John Jane Alice Bob Charlie]
last_names  = %w[Doe Smith Johnson Williams Brown]

users = first_names.each_with_index.map do |first_name, index|
  User.create!(
    email: "user#{index + 1}@gmail.com",
    password: '123456',
    password_confirmation: '123456',
    first_name:,
    last_name: last_names[index],
    online: false
  )
end

puts 'Seeding subforums, posts and comments...'
subforums = [
  { name: 'Anxiety Support', description: 'Share coping strategies and success stories.' },
  { name: 'Burnout Recovery', description: 'Talk about workplace stress and rebuilding routines.' },
  { name: 'Mindfulness', description: 'Discuss meditation, mindful habits and resources.' }
].map { |attrs| Subforum.create!(attrs) }

subforums.each do |subforum|
  3.times do |index|
    author = users.sample
    post = Post.create!(
      title: "#{subforum.name} Topic #{index + 1}",
      content: "This is a community thread about #{subforum.name.downcase}.",
      user: author,
      subforum:
    )

    rand(2..4).times do |comment_index|
      commenter = (users - [author]).sample
      Comment.create!(
        body: "Comment ##{comment_index + 1} on #{post.title}.",
        user: commenter,
        post:
      )
    end
  end
end

puts 'Seeding journals...'
users.each do |user|
  2.times do |index|
    Journal.create!(
      title: "Reflection #{index + 1} by #{user.first_name}",
      content: "Today I learned something new about taking care of myself.",
      user:
    )
  end
end

puts 'Seeding sample calls...'
users.combination(2).first(2).each_with_index do |pair, index|
  Call.create!(
    call_category: %w[Support Listening Coaching].sample,
    speaker: pair.first,
    listener: pair.last,
    connected: index.zero? # one active, one finished
  )
end

puts 'Seeding completed successfully.'
