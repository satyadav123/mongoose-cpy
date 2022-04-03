const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
const connectDB=()=>{
 // return mongoose.connect("mongodb://127.0.0.1:27017/web-15");
return mongoose.connect("mongodb://127.0.0.1:27017/books");
    
};
const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    checkedout:{type:Date,required:true},
    checkedin:{type:Date,required:false}
},
{
    versionKey:false,
    timestamps:true,
}
);
const User=mongoose.model("userName",userSchema);

const sectionSchema=new mongoose.Schema({
    subject:{type:String,required:true}
},
{
    versionKey:false,
    timestamps:true,
});
const Section=mongoose.model("section",sectionSchema);
const bookSchema=new mongoose.Schema({
    name:{type:String,required:true},
    sectionId:{type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true
    }
},
{
    versionKey:false,
    timestamps:true,
});
const Book=mongoose.model("book",bookSchema);
const authorSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"userName",
        required:true
    }
},
{
    versionKey:false,
    timestamps:true,
});
const Author=mongoose.model("author",authorSchema);
const book_authorSchema=new mongoose.Schema({
    bookId:{type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    },
    authorId:{type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true
    }
},{
    versionKey:false,
    timestamps:true,
});
const BookAuthor=mongoose.model("book-author",book_authorSchema);

app.post("/users",async(req,res)=>{
    try {
        const users=await User.create(req.body);
        return res.send(users);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});


app.post("/section",async(req,res)=>{
    try {
        const section=await Section.create(req.body);
        return res.send(section);
    } catch (error) {
        console.log(error)
    }
})


app.post("/books",async(req,res)=>{
    try {
        const books=await Book.create(req.body);
        return res.send(books)
    } catch (error) {
        console.log(error)
    }
});



app.post("/author",async(req,res)=>{
    try {
        const author=await Author.create(req.body);
        return res.send(author);
    } catch (error) {
        console.log(error)
    }
});

app.post("/book_author",async(req,res)=>{
    try {
        const Book_author=await BookAuthor.create(req.body);
        return res.send(Book_author);
    } catch (error) {
        console.log(error)   
    }
})

app.get("/books",async(req,res)=>{
    try {
        const books=await Book.find({sectionId:req.params.sectionId}).populate("sectionId").lean().exec();
        return res.send(books);
    } catch (error) {
        console.log(error);
    }
});
app.get("/books",async(req,res)=>{
    try {
        const books=await Book.find({AuthorId:req.params.sectionId}).populate("AuthorId").lean().exec();
        return res.send(books);
    } catch (error) {
        console.log(error);
    }
});
app.listen(5300,async()=>{
    try {
        await connectDB();
        
    } catch (error) {
        console.log(error)
    }
    console.log("listening 5300");
})