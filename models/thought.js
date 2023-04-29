const { Schema, model, Types } = require('mongoose'); //Import Schema, model, and Types from Mongoose

function dateFormat(timestamp) { //Function for date and time
    return new Date(timestamp).toISOString(); //Convert the timestamp to an ISO-formatted date string
}

const reactionSchema = new Schema( //Define a schema for reactions
    {
        reactionId: { //Define the reactionId field
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId() // It defaults to a new ObjectId
        },
        reactionBody: { //Define the reactionBody field
            type: String, 
            required: true, 
            maxlength: 280 //It has a maximum length of 280 characters
        },
        username: { //Define the username field
            type: String, 
            required: true 
        },
        createdAt: { //Define the createdAt field
            type: Date, //Type is date
            default: Date.now, //It defaults to the current date and time
            get: timestamp => dateFormat(timestamp) //Format the timestamp using the dateFormat helper function
        },
    },
    {
        toJSON: { //Define the toJSON option
            virtuals: true, //Include virtual properties when converting the document to JSON
            getters: true //Include getters when converting the document to JSON
        },
        id: false //Do not include the 'id' property in the JSON output
    }
);

const thoughtSchema = new Schema( //Define a schema for thoughts
    {
        thoughtText: { //Define the thoughtText field
            type: String, 
            required: true,
            minlength: 1, //It has a minimum length of 1 character
            maxlength: 280 //It has a maximum length of 280 characters
        },
        username: { //Define the username field
            type: String, 
            required: true 
        },
        createdAt: { //Define the createdAt field
            type: Date, //Type is date
            default: Date.now, //It defaults to the current date and time
            get: timestamp => dateFormat(timestamp) //Format the timestamp using the dateFormat helper function
        },
        reactions: [reactionSchema] //Define an array of reaction objects
    },
    {
        toJSON: { //Define the toJSON option
            virtuals: true, //Include virtual properties when converting the document to JSON
            getters: true //Include getters when converting the document to JSON
        },
        id: false //Do not include the 'id' property in the JSON output
    }
);

thoughtSchema.virtual('reactionCount').get(function () { //Define a virtual property called reactionCount
    return this.reactions.length; //Return the length of the reactions array
});

const Thought = model('Thought', thoughtSchema); //Create a Thought model using the thoughtSchema

module.exports = Thought; //Export the Thought model
