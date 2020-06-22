import React,{Component} from 'react'; 
import { CSVReader } from 'react-papaparse';
import axios from 'axios';
import {Table, Modal, Button} from 'react-bootstrap';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class ApiCall extends Component { 

	constructor(props){
    super(props);
    this.state = {user:[], show: false};
  }
  
  
  componentDidMount(){
    axios.get('https://cephs-images-api.herokuapp.com/api/v1/leaderBoard')
    .then(res=> {
      console.log(res.data.result[0]);
      this.handleReadCSV(res.data.result);
    }).catch(err=>{
      console.log(err);
    })
  }
    handleClose = () => {
      
      this.setState({show: false})
    };
    handleShow = (person,i) => {
      this.setState({show: true, shareDetails: person, position: i })
    };

  handleReadCSV = data => {
    console.log(data)
    let userObj = {};
    const arr = [] 
    data.map(data=>{
      // console.log(data.data)
      arr.push(data)
    })
    arr.sort(compareSecondColumn);

    function compareSecondColumn(a, b) {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? 1 : -1;
        }
    }
    // console.log(arr[1])
    this.setState({user:arr});
  }

  handleClick = (e)=>{
    console.log(e)
  }

  render() {
    const {show} = this.state;
    return (
      <div>
        {/* ---------modal ------------------- */}
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              HNG LEADER SCOREBOARD
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 class="text-center">{`Hello ${this.state.shareDetails}, what social medium do you want to share your score`}</h5>
            <div className="flex-space-between">
            <TwitterShareButton
              url={'https://twitter.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            <FacebookShareButton
              url={'https://facebook.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <InstapaperShareButton
              url={'https://instagram.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <InstapaperIcon
                size={32}
                round />
            </InstapaperShareButton>
            <LinkedinShareButton
              url={'https://linkedin.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>
            <TelegramShareButton
              url={'https://Telegram.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <TelegramIcon
                size={32}
                round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={'https://whatsapp.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <WhatsappIcon
                size={32}
                round />
            </WhatsappShareButton>
  

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -------------modal------------- */}
        
        <Table striped bordered hover className={'table'}>
      <tbody>

      <tr>
      <td>{"#"}</td>
              <td className={ "dark"}>FULLNAME</td>
              <td className={ "dark"}>USERNAME</td>
              <td className={ "dark"}>EMAIL</td>
              <td className={ "dark"}>TOTAL POINTS</td>
              <td className={ "dark"}></td>
      </tr>
      {this.state.user.map((person, i) => (

        <tr 
        onClick={ ()=> this.handleClick(i)} 
        id={i}>
          
           
              
         
        
            <td>{i}</td>
            <td className={(i === 0 | i === 1 |i === 2 ) ? "dark" : "" }>{person['FULL NAME']}</td>
            <td className={(i === 0 | i === 1 |i === 2 ) ? "dark" : "" }>{person['USERNAME']}</td>
            <td className={(i === 0 | i === 1 |i === 2 ) ? "dark" : "" }>{person['EMAIL']}</td>
            <td className={(i === 0 | i === 1 |i === 2 ) ? "dark" : "" }>{person['TOTAL POINTS']}</td>
            <td className={(i === 0 | i === 1 |i === 2 ) ? "dark" : "" }>
              
          <Button variant="primary" onClick={()=>this.handleShow(person['USERNAME'], i)}>
            share
          </Button></td>
        
          
        </tr>
        ))}
      </tbody>
    </Table>
      </div>
    );
  }
} 

export default ApiCall; 


