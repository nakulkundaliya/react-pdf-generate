import React from 'react';
import Pdf from 'react-to-pdf';
import './App.css';
import { dummyData } from './utils';

const ref = React.createRef();

const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [12,12]
};

const App = () => {
  
  const InvoiceSum = dummyData.items.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  return (
    <div>
      <Pdf targetRef={ref} filename='order_receipt.pdf' x={.5} y={.5} options={options} scale={0.78}>
        {({ toPdf }) => (
          <div className='btn-container'>
            <button className='btn-generate' onClick={toPdf}>
              Generate Pdf
            </button>
          </div>
        )}
      </Pdf>
    
        <div className='App' ref={ref}>
          <div className='main-invoice'>
            <div className='header'>
              <span className='header-title'>
                <h1>Bock</h1>
                <h1 className='title-thin'>Lighting</h1>
              </span>
              <span className='header-title'>
                <h2>Sales Order Acknowledgment</h2>
                <div className='header-order-info-container'>
                  {dummyData.orderInfo.map((info, index) => (
                    <div className='header-order-info' key={index}>
                      <span>{info.value}</span>
                      <h4>{info.label}</h4>
                    </div>
                  ))}
                </div>
              </span>
            </div>

            <div className='billing'>
              <div className='billing-col'>
                <h4>Bill To:</h4>
                <div>{dummyData.billingAddress}</div>
              </div>
              <div className='billing-col'>
                <h4>Ship To:</h4>
                <div>{dummyData.shippingAddress}</div>
              </div>
            </div>

            <div className='logistic'>
              {dummyData.logisticInfo.map(({ label, value }) => (
                <div className='logistic-items' key={value}>
                  <h4>{label}</h4>
                  <p>{value}</p>
                </div>
              ))}
            </div>

            <div className='items-table'>
              <table id='customers'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ITEM NUMBER</th>
                    <th>DESCRIPTION</th>
                    <th>UOM</th>
                    <th>BALANCE</th>
                    <th>ORDERED</th>
                    <th>PRICE</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.itemNumber}</td>
                      <td>{item.desc}</td>
                      <td>{item.uom}</td>
                      <td>{item.balance}</td>
                      <td>{item.ordered}</td>
                      <td>{item.price}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='invoice-total'>
              <div>
                {dummyData.invoiceCharges.map((item, index) => (
                  <div className='invoice-item' key={index}>
                    <h4>{item.label}</h4>
                    <span>{`$ ${item.value.toFixed(2)}`}</span>
                  </div>
                ))}
                <div className='invoice-item'>
                  <h4>Total</h4>
                  <span>{`$ ${InvoiceSum || ''}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
    </div>
  );
};

export default App;
