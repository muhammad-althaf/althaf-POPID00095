import axios from "axios";
import { useState } from "react";
import "./App.css";
// import Razorpay from 'razorpay';


function App() {
	const [book, ] = useState(
    {
      name: "APPLE iPhone XR ",
      author: "White, 128 GB",
      img: "https://images.pexels.com/photos/3036882/pexels-photo-3036882.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 41000
    }
	);

	const initPayment = (data) => {
		
		const options = {
			key: "rzp_test_uCcnRXcs4UqNnk",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {console.log(response,"res");
				try {
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					// console.log(data,"verify resp");
					
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "red",
			},
		};
		// const rzp1 = new window.Razorpay(options);
		// rzp1.open();
		const paymentObject = new window.Razorpay(options);
        paymentObject.open();
	};

	const handlePayment = async () => {
		try {
			const { data } = await axios.post("http://localhost:8080/api/payment/orders", { amount: book.price });
			console.log(data);
			initPayment(data.data);
			
		} catch (error) {
			console.log(error);
    
		}
	};

	return (
		<div className="App">
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">{book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>
			</div>
		</div>
	);
}

export default App;