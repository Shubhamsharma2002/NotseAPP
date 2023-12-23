import { useState , useRef, useEffect,} from "react";

//Blogging App using Hooks

export default function Blog(){
     const[title, SetTitle] = useState("");
     const[content, SetContent] = useState("");
     const [ blogs, setBlogs] = useState([]);
     const titleRef = useRef(null);
    //   code for showning title menu option line on
     useEffect(()=>{
        titleRef.current.focus();
     },[]);
    //  too change the title of web page to the title of current title of the first blog
     useEffect(() =>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "noo";
        }
     },[blogs])
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title,content},...blogs]);
        SetTitle("");
        SetContent("");
        // showing line on title after submiting data
        titleRef.current.focus();
        console.log(blogs);
    }
     function removeBlog(i){
      setBlogs(blogs.filter((blog,index)=> i !== index));
     }
    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={title}  onChange={(e) => SetTitle(e.target.value)}
                                 ref={titleRef}
                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.." value={content} onChange={(e) => SetContent(e.target.value)} required/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
            {blogs.map((blog,i) =>(
              <div className="blog" key={i}> 
                 <h3>{blog.title}</h3>
                 <p>{blog.content}</p>

                 <div className="blog-btn">
                  <button  onClick={ () => removeBlog(i)} className="btn remove">
                       Delete
                  </button>

                 </div>
              </div>
            ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}








