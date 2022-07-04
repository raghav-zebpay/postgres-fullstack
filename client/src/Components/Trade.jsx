import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function BasicCard(props) {


    const [val,setVal]=React.useState(0);
    const [total,setTotal]=React.useState(0);

    const [price,setPrice]=React.useState(props.price)

    const [pairprice,setpairprice]=React.useState(0);

      // console.log(props.price);
    React.useEffect(()=>{
      setPrice(props.price);
    })

    React.useEffect(() => {
      axios.get(`/${props.coin}`)
        .then((res) => {
          setpairprice(res.data.rows.filter(price=>price.exc===props.exchange))
          console.log(" trade data");
          console.log(res);
          console.log(props.exchange);
          console.log(res.data.filter(price=>price.exc===props.exchange));
        })
        .catch((err) => {
          console.log(err);
        });
    },[]);

    async function data_getter(){
      await axios.get(`/${props.coin}`)
      .then((res) => {
        setpairprice(res.data.rows.filter(price=>price.exc===props.exchange))
        console.log(" trade data");
        console.log(res);
        console.log(props.exchange);
        // console.log(res.data.filter(price=>price.exc===props.exchange));
        // setPrice(pairprice[0].price);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    setTimeout(data_getter,5000);


   function submit(event){
      //  event.preventDefault();
        var date =new Date()


      date = date.getUTCFullYear() +
      ('00' + (date.getUTCMonth()+1)).slice(-2) +
      ('00' + date.getUTCDate()).slice(-2) + 
      ('00' + date.getUTCHours()).slice(-2)+ 
      ('00' + date.getUTCMinutes()).slice(-2) + 
      ('00' + date.getUTCSeconds()).slice(-2);

      if(parseInt(val)>0){
       axios.post("http://localhost:3001/trades",
       {
         id:date,
         quantity:parseInt(val),
         currency:props.coin.toUpperCase(),
         exchange_name:props.exchange,
         price:pairprice[0].price,
         total:parseInt(val)*pairprice[0].price,
         execution:"sucess",
         action:props.action
      })
      .then(res=>{
        console.log(res.data)
      })
    }
    else{
      alert("quantity should be greater than 0")
    }
  }

      // format for storing date if needed 
     //  date = date.getUTCFullYear() + '-' +
      //  ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      //  ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      //  ('00' + date.getUTCHours()).slice(-2) + ':' + 
      //  ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      //  ('00' + date.getUTCSeconds()).slice(-2);

  return (
    <form onSubmit={(event)=>submit(event)}>
    <Card sx={{ minWidth: 275 }} style={{textAlign:"center"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Summary of Order
        </Typography>
        <Typography variant="h5" component="div">
          Qty to {props.action}
        </Typography>
        <input type="number" style={{borderRadius:"5%",textAlign:"centre"}} placeholder="Qty" value={val} onChange={(event)=>{
          // console.log(event.target.value)
          setVal(event.target.value)
        }} ></input>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* adjective */}
        </Typography>

        {val>0?
        <Typography variant="body2">
          you are about to {props.action} {val} {props.coin.toUpperCase()} from {props.exchange.toUpperCase()} at a price of {pairprice[0].price} per coin 
          <br></br>
        </Typography>
        :null
        }
        {/* {console.log(pairprice[0],"hello")} */}
        {val>0?<Typography>Total amount to be paid = {pairprice[0].price*val} </Typography>:null}
        {/* <Typography>Total amount to be paid = {price*val} </Typography> */}
        
        <br></br>
        
      </CardContent>
      <CardActions style={{marginLeft:"auto"}}>
        {/* <Button size="small" >Confirm Order</Button> */}
        <button type="button submit" className="btn btn-outline-warning btn-lg" style={{width:"500px"}} >Confirm Order</button>
      </CardActions>
    </Card>
    </form>
  );
}

// export default BasicCard