# db/seeds.rb

# Destruir todos los registros existentes en los modelos
User.destroy_all
Forum.destroy_all
Post.destroy_all
Journal.destroy_all

puts 'datos borrados de los modelos'

# Nombres y apellidos para los usuarios
first_names = ["John", "Jane", "Alice", "Bob", "Charlie"]
last_names = ["Doe", "Smith", "Johnson", "Williams", "Brown"]

# Crear 5 usuarios
users = 5.times.map do |i|
  User.create!(
    email: "user#{i + 1}@gmail.com",
    password: '123456',
    password_confirmation: '123456',
    first_name: first_names[i],
    last_name: last_names[i]
  )
end
# Crear 5 forums con 5 topics cada uno acerca de salud mental
forums = 5.times.map do |i|
  forum = Forum.create!(topic: "Mental Health Forum #{i + 1}")

  5.times do |j|
    subforum = Subforum.create!(name: "Subforum #{j + 1} in #{forum.topic}", description: "Description of Subforum #{j + 1} in #{forum.topic}")

    topic = Post.create!(
      title: "Topic #{j + 1} in #{forum.topic}",
      content: "Content of topic #{j + 1} in forum #{forum.topic}",
      user: users.sample,
      subforum_id: subforum.id  # Usamos subforum.id aquí
    )

    # Crear 5 posts por cada topic
    5.times do |k|
      Post.create!(
        title: "Post #{k + 1} in #{topic.title}",
        content: "Content of post #{k + 1} in topic #{topic.title}",
        user: users.sample,
        subforum_id: subforum.id  # Usamos subforum.id aquí también
      )
    end
  end
end



# Crear entre 2 y 3 journals por usuario
users.each do |user|
  rand(2..3).times do |i|
    Journal.create!(
      title: "Journal #{i + 1} by #{user.email}",
      content: "Content of journal #{i + 1} by #{user.email}",
      user: user
    )
  end
end

puts "Database seeded successfully!"
