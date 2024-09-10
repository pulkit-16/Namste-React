import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            count:0,
            count2:0
            
        };
       console.log(this.props.name + "child constructor");
    }

    updateCount=()=>{
        this.setState(
            {
            count :this.state.count+1,
            count2 :this.state.count+2
        }
    )
        console.log("updated count" , this.state.count+1)
        console.log("update count")
        
    }
    
    componentDidMount(){
        console.log(this.props.name + "Child Component Mount ")
    }
    render(){
        console.log("child render")
        const{count,count2} = this.state;

        const{name,location, email} = this.props;
        return(
            <div className='user-card'>
            <h1>Count : {count}</h1>
            <h1>Count : {count2}</h1>

            
            <button className="count-btn" onClick={this.updateCount}>Count Increament</button>

            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h3>Email Id:  {email} </h3>
        </div>
        )
        
   
    }
}


export default UserClass;