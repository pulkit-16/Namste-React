import React from "react";
import User from "./User";
import UserClass from "./UserClass";


class About extends React.Component{


  constructor(props){
    super(props)
    console.log("Parent constructor")
  }

  componentDidMount(){
    console.log("Parent Mounting")
  }

  render(){

    console.log("Parent render")
    return(
      <div>
      <h1>About the restautant info</h1>

      <UserClass
        name= {"Akshat Jaggi (class)"}
        location= {"New Delhi"}
        email= {"akshat.jaggi@gmail.com"}
      />
      <UserClass
        name= {"Elon Musk(class)"}
        location= {"Us"}
        email= {"musk.jelon@gmail.com"}
      />
    </div>
    )
  }
}




// const About = () => {
//   return (
   
//   );
// };

export default About;
