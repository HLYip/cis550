
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';



export default class Fblogin extends Component {
  state={
    isLoggedIn:false,
    userId:'',
    name:'',
    email:''

  }
  responseFacebook = response =>{
    console.log(response);
    this.setState({
      isLoggedIn : true,
      userId : response.userId,
      name : response.name,
      email : response.email
    })
  }

  componentClicked = () => console.log();


  render() {
    let FBcontent;
    if(this.state.isLoggedIn){
      FBcontent=(
        <div> 
          <h2>Welcome {this.state.name} !</h2> 
           Your Current Email is : {this.state.email}
        
        </div>
        
      );

    }else {
      FBcontent=(<FacebookLogin
      appId="230181249125822"
      autoLoad={false}
      fields="name,email,picture"
      onClick={this.componentClicked}
      callback={this.responseFacebook}
      size= 'small'
      
      />);
  
    }
    return (
      <div> {FBcontent}</div>
    )
  }
}
