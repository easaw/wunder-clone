json.array!(@users) do |user|
	json.partial!("user", user: user)
end

# json.array!(@users) do |user|
# 	json.(user.email) email user.id
# end