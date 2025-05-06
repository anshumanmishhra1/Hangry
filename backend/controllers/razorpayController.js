// razorpay
import razorpay from 'razorpay'

const razorpayInstance = new razorpay({
    key_id: "rzp_test_DAcS9dFt98s47o",
    key_secret: "RBX3uEvsTLiDDADmiTymT8y6"
});

const paymentRazorpay = async(req, res) => {
    try {
        const {userId} = "user1" // Get userId from auth middleware
        const {planId,amount} = req.body

        if(!planId) {
            return res.json({success: false, message: 'Plan ID is required'})
        }

        let credits, plan, date 
        plan = 'pay,payment'
        credits = 5000

        date = Date.now();

        const transactionData = {
            userId, 
            plan, 
            amount, 
            credits, 
            date
        }

        // const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: 'INR', // Hardcoded for now (should be from env)
            receipt: 'transaction_id',
        }

        // Verify Razorpay instance is initialized
        if(!razorpayInstance) {
            throw new Error('Razorpay instance not initialized')
        }

        const order = await razorpayInstance.orders.create(options)
        res.json({success: true, order})


    } catch (error){
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

const verifyRazorpay = async (req , res)=>{
    try {

        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({success:false, message: 'Payment Failed'})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

            res.json({success: true, message:"Credits Added"})
        }else{
            res.json({success: false, message: 'Payment Failed'})
        } 
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {paymentRazorpay,verifyRazorpay}