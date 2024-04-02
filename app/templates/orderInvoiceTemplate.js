const moment = require("moment");

const OrderHtmlTemplate = (order) => {
  // Check if order is undefined or null
  if (!order) {
    return "";
  }

  const getQuantity = () => {
    let q = 0;
    order.OrderItems.map((oi) => {
      q += oi.iQuantity;
    });

    return q;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
        }

        header {
            display: flex;
            gap: 20px;
            align-items: center;
            padding: 10px 0;
        }

        .headerlogo {
            height: 80px;
        }

        .headerright {
            display: flex;
            flex-direction: column;
        }

        .headerrightupper {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .headerrightbottom {
            margin-top: 10px;
        }

        hr {
            height: 1px;
            background-color: gray;
            width: 100%;
        }

        .orderdetailsdiv {
            display: flex;
            /* flex-wrap: wrap; */
            align-items: center;
            gap: 10px;
        }

        .orderdetails, .billingaddress, .shippingaddress{
            /* flex-basis: calc(25% - 10px); */
            flex: 1.5;

        }

        .warrentywarning {
            flex: 1;
            font-size: 12px;
        }

        .orderdetails, .billingaddress, .shippingaddress, .warrentywarning {
            padding: 10px;
            display: flex;
            flex-direction: column;
            /* align-items: center; */
            justify-content: space-between;
            
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            border-top: 2px solid gray;
            border-bottom: 2px solid gray;
        }
        th,td{
            padding: 5px 5px 5px 10px;
            text-align: left;
            min-width:60px;
        }

        .totaltd {
            border-top: 2px solid gray;
            padding:15px 5px;
        }
        .lastrowtd {
            border-top: 2px solid gray;
            border-bottom: 2px solid gray;
            padding:15px 5px;
        }

        p.computergeneratedwarning {
            text-align: center;
            margin-top: 10px;
        }

        .grandtotal{
            font-weight:700;
        }

        footer {
            margin-top: auto;
            font-size: 12px;
        }

        .footerimgdiv {
            text-align: right;
            margin-bottom: 10px;
        }

        .footerimg {
            max-height: 60px;
        }

        .returnpolicy, .conditionsapply {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
<div class="body">
    <header>
        <img src="http://localhost:3001/uploads/logo.png" class="headerlogo" alt="">
        <div class="headerright">
            <div class="headerrightupper">
                <div class="hrucontact">Contact us: 9426087797 || sarjilpatel2903@gmail.com</div>
                <div class="hruinvoiceid"><b>Product Invoice #</b>${
                  order.iUserId + "" + Date.now()
                }</div>
            </div>
            <div class="headerrightbottom">
                <p><i><span>Eshop.com, </span>Warehouse Address: Abhishree Complex, 304, Satellite Rd, opp. Star India
                        Bazaar, Ahmedabad, Gujarat 380015</i></p>
            </div>
        </div>
    </header>
    <hr>

    <div class="orderdetailsdiv">
        <div class="orderdetails">
            <p><b>Order Id: #${order.id}</b></p>
            <p><b>Order Date: </b>${moment(order.createdAt).format("ll")}</p>
            <p><b>Invoice Date: </b>${moment(Date.now()).format("ll")}</p>
            <p><b>VAT/TIN: </b>121212121212</p>
            <p><b>CST #: </b>121212121212</p>
        </div>
        <div class="billingaddress">
            <p><b>Billing Address</b></p>
            <p>${order.billingAddress.vFirstname} ${
    order.billingAddress.vLastname
  }</p>
            <p>${order.billingAddress.vHouse}</p>
            <p>${order.billingAddress.vArea}</p>
            <p>${order.billingAddress.vCity} ${order.billingAddress.vPincode} ${
    order.billingAddress.vState
  }</p>
            <p>${order.billingAddress.vPhone}</p>
        </div>
        <div class="shippingaddress">
            <p><b>Shipping Address</b></p>
            <p>${order.billingAddress.vFirstname} ${
    order.billingAddress.vLastname
  }</p>
            <p>${order.shippingAddress.vHouse}</p>
            <p>${order.shippingAddress.vArea}</p>
            <p>${order.shippingAddress.vCity} ${
    order.shippingAddress.vPincode
  } ${order.shippingAddress.vState}</p>
        </div>
        <div class="warrentywarning">
            <p><i>*Keep this invoice and <br/> maufacturer box for <br/>warranty purposes</i></p>
        </div>
    </div>

    <table>
        <thead>
        <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Qty</th>
            <th>Price (₹)</th>
            <th>Tax (₹)</th>
            <th>Total (₹)</th>
        </tr>
        </thead>
        <tbody>
        ${order.OrderItems.map(
          (oi) => `<tr>
                <td>Tshirts (Men)</td>
                <td>${oi.Product.vTitle}</td>
                <td>${oi.iQuantity}</td>
                <td>${oi.Product.fPrice}</td>
                <td>${
                  (oi.iQuantity * oi.Product.fPrice * oi.Product.fTax) / 100
                }</td>
                <td>${
                  oi.iQuantity * oi.Product.fPrice +
                  (oi.iQuantity * oi.Product.fPrice * oi.Product.fTax) / 100
                }</td>
            </tr>`
        ).join("")}
        
        <tr>
            <td></td>
            <td class="totaltd grandtotal">Total</td>
            <td class="totaltd">${getQuantity()}</td>
            <td class="totaltd">${order.fTotal - order.fTotalTax}</td>
            <td class="totaltd">${order.fTotalTax}</td>
            <td class="totaltd">${order.fTotal}</td>
        </tr>
        
        <tr>
            <td></td>
            <td class="totaltd grandtotal" colspan="1">Coupon code applied - </td>
            <td class="totaltd grandtotal" colspan="4">${order.vCouponCode} - ${
    order.fDiscount
  }% ( - ₹${(order.fTotal - order.fDiscounted).toFixed(2)} ) </td>
        </tr>

        <tr>
            <td></td>
            <td class="totaltd grandtotal" colspan="1">Selected Shipping - </td>
            <td class="totaltd grandtotal" colspan="4">${
              order.ShippingType.vName
            } ( + ₹${order.ShippingType.fCharge} )</td>
        </tr>
        <tr class="lastrow">
            <td class="lastrowtd"></td>
            <td class="lastrowtd grandtotal" colspan="1">Grand total</td>
            <td class="lastrowtd grandtotal" colspan="4">₹${order.fGrandTotal.toFixed(
              2
            )}</td>
        </tr>
        </tbody>

    </table>
    <p class="computergeneratedwarning">
        <i>This is computer generated invoice. No Signature required.</i>
    </p>
</div>

<footer>
    <div class="footerimgdiv">
        <img src="http://localhost:3001/uploads/footerlogo.png" alt="" class="footerimg">
    </div>
    <p class="returnpolicy">
        <b>Returns Policy:</b> <i>At Eshop we try to deliver perfectly each and every time. But in the off chance
            that you need to return the item, please do so with the </i><b>original Brand</b>
    </p>
    <p class="conditionsapply">
        <b>box/price tag, original packing and Invoice</b> <i>without which it will be really difficult for us to act
            on your request. Please help us in helping you. Terms and conditions apply</i>
    </p>
    <p>
        <i>The goods sold as part of this shipment are intended for end wer consumption / retail sale and not for
            re-sale</i>
    </p>
    <p>
        <i>Regd office: : Abhishree Complex, 304, Satellite Rd, opp. Star India Bazaar,
        Ahmedabad, Gujarat 380015</i>
    </p>
    <hr>
</footer>
</body>
</html>
`;
};

module.exports = OrderHtmlTemplate;
