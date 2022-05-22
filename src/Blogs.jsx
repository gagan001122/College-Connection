import Blog from "./Blog";
import "./blogs.css";
import React from "react";
export default function Blogs({blogs}) {
  return (
    <div className="blogs">
      {
        blogs.map((b)=>(
          < Blog blog={b}/>
        ))}

      {/* <Post img="../pexels-fallon-michael-3551722.jpg" />
      <Post img="../pexels-peng-liu-169647.jpg"/>
      <Post img="../pexels-jaime-reimer-2662116.jpg"/>
      <Post img="../pexels-designecologist-1779487.jpg"/>
      <Post img="../pexels-pixabay-274422.jpg "/>
      <Post img="../pexels-rachel-claire-4857757.jpg" />
       <Post img="../pexels-fallon-michael-3551722.jpg" />
      <Post img="../pexels-peng-liu-169647.jpg"/> */}
      {/*<Post img="../pexels-jaime-reimer-2662116.jpg"/>
      <Post img="../pexels-designecologist-1779487.jpg"/>
      <Post img="../pexels-pixabay-274422.jpg "/>
      <Post img="../pexels-rachel-claire-4857757.jpg" />
      <Post img="../pexels-fallon-michael-3551722.jpg" />
      <Post img="../pexels-peng-liu-169647.jpg"/>
      <Post img="../pexels-jaime-reimer-2662116.jpg"/>
      <Post img="../pexels-designecologist-1779487.jpg"/>
      <Post img="../pexels-pixabay-274422.jpg "/> */}
    </div>
  );
}