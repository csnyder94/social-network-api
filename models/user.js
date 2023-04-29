const { Schema, model } = require('mongoose'); //Import schema and model from Mongoose

const userSchema = new Schema( //Create a new user schema
    {
        username: { //Define the username field
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: { //Define the email field
            type: String,
            required: true, 
            unique: true, 
            match: [/.+\@.+\..+/, 'Please enter a valid email address!'] //It must match this regular expression or it will show error message
        },
        thoughts: [ //Define the thoughts field as array 
            {
                type: Schema.Types.ObjectId, //Type is ObjectId
                ref: 'Thought' //It references the Thought model
            }
        ],
        friends: [ //Define the friends field as an array
            {
                type: Schema.Types.ObjectId, //Type is ObjectId
                ref: 'User' //It references the User model
            }
        ]
    },
    {
        toJSON: { //Define the toJSON option
            virtuals: true, //Including virtual properties when converting the document to JSON
        },
        id: false //Excludes id property in the JSON output
    }
);

userSchema.virtual('friendCount').get(function () { //Define a virtual property called friendCount
    return this.friends.length; //Return the length of the friends array
});

const User = model('User', userSchema); //Create  User model using the userSchema

module.exports = User; //Export User model