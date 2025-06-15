import React from 'react';
import { Card, Space, Progress } from 'antd';

const Chart = ({ allTranscations }) => {
 const categories=["salary","tip","project","food","movie","bills","others"];
  const totalTranscations = allTranscations.length;
  const totalIncomeTranscations = allTranscations.filter(
    (transaction) => transaction.type === 'income'
  );
  const totalExpensesTranscations = allTranscations.filter(
    (transaction) => transaction.type === 'expense'
  );

  const totalIncomePercent = (totalIncomeTranscations.length / totalTranscations) * 100;
  const totalExpensePercent = (totalExpensesTranscations.length / totalTranscations) * 100;

  const totalTurnOver = allTranscations.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = totalIncomeTranscations.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseTurnover = totalExpensesTranscations.reduce((acc, t) => acc + t.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnOver) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnOver) * 100;

  return (
    <>
      <Space direction="horizontal" size={16} style={{ margin: '2rem' }}>
        <Card title={`Total Transactions: ${totalTranscations}`} style={{ width: 300 }}>
          <h5 style={{ color: 'green' }}>Income: {totalIncomeTranscations.length}</h5>
          <h5 style={{ color: 'red' }}>Expenses: {totalExpensesTranscations.length}</h5>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 4 }}>Income %</p>
              <Progress
                type="circle"
                percent={parseFloat(totalIncomePercent.toFixed(0))}
                strokeColor="green"
                width={80}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 4 }}>Expense %</p>
              <Progress
                type="circle"
                percent={parseFloat(totalExpensePercent.toFixed(0))}
                strokeColor="red"
                width={80}
              />
            </div>
          </div>
        </Card>
        <Card title={`Total Turnover: ₹${totalTurnOver}`} style={{ width: 300 }}>
          <h5 style={{ color: 'green' }}>Income: ₹{totalIncomeTurnover}</h5>
          <h5 style={{ color: 'red' }}>Expenses: ₹{totalExpenseTurnover}</h5>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 4 }}>Income %</p>
              <Progress
                type="circle"
                percent={parseFloat(totalIncomeTurnoverPercent.toFixed(0))}
                strokeColor="green"
                width={80}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 4 }}>Expense %</p>
              <Progress
                type="circle"
                percent={parseFloat(totalExpenseTurnoverPercent.toFixed(0))}
                strokeColor="red"
                width={80}
              />
            </div>
          </div>
        </Card>
      </Space>
      <Space>
        <Card title="Income Wise Expenses">
            {
                categories.map(category=>{
                       const amount= allTranscations.filter( transaction=>transaction.type==="income"&& transaction.category===category).reduce((acc,transcation)=>acc+transcation.amount,0);
                       return(
                        amount>0 &&
                        <Card >
                        <h5>{category}</h5>
                        <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                        </Card>
                       )
                })

            }
            </Card>
            <Card title="Expense Wise Expenses">
            {
                categories.map(category=>{
                       const amount= allTranscations.filter( transaction=>transaction.type==="expense"&& transaction.category===category).reduce((acc,transcation)=>acc+transcation.amount,0);
                       return(
                        amount>0 &&
                        <Card >
                        <h5>{category}</h5>
                        <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>
                        </Card>
                       )
                })

            }
        </Card>
      </Space>
    </>
  );
};

export default Chart;
