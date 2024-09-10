import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userInfo:{
              name :"Default" ,
              location:"Dummy"       //   state variable initial ,, not necessary to write
            }
        }

        console.log("child constructors")
       
    }

    async componentDidMount(){
        //API CALL
     const data = await fetch("https://api.github.com/users/pulkit-16");
     const json =  await data.json()
     console.log(json)

     this.setState({
        userInfo:json,

     })

    this.timer =  setInterval(()=>{
        console.log("Namste");
     },1000)
    }

    componentDidUpdate(){
        console.log("component updates")
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        
        console.log("componenet unmounts")
    }
   
    render(){
        console.log("child renders")
       const{name,location,type} =this.state.userInfo;
        const{ email} = this.props;
        //debugger;
        return(
            <div className='user-card'>
            <h1>Type :{type}</h1>
            <h2>Name: {name}</h2>
            <h3>Location:{location} </h3>
            <h3>Email Id:  {email} </h3>          {/*props*/}
        </div>
        )
        
   
    }
}


export default UserClass;