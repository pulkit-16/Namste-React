import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";


class About extends React.Component{


  constructor(props){
    super(props)
    //console.log("Parent constructor")
  }

  componentDidMount(){
  //  console.log("Parent Mounting")
  }

  render(){

    //console.log("Parent render")
    return(
      <div>
      <h1>About the restautant info</h1>
      <UserContext.Consumer>
      {({loggedInUser})=><h1 className="font-bold">{loggedInUser}</h1>}
      </UserContext.Consumer>

      <UserClass
        email= {"akshat.jaggi@gmail.com"}
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
