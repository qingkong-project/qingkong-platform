import React from "react";
import "./NoteDetail.less";
import { Button } from "antd";

const NoteDetail = ({ detail }) => {
  return <div className={'note-detail'}>
      <div className={'header'}>

          <div>
              <img className={'avatar'} src="http://public-api.rico.org.cn/382495b0-36e5-4d9f-bf00-94191d5bdf13.jpeg" alt=""/>
              <span>{detail.title}</span>
          </div>

          <Button>关注</Button>
      </div>

      <div className="date-detail">
          <p style={{fontSize:'120px',marginBottom:'0',textAlign:'center',color:'#172991'}}>03/27</p>
          <p style={{display:'flex',justifyContent:'space-between',color:'#172991'}}>
              <span>星期日 农历 二月二十五</span>
              <span>任引 【虎年】 以某日啊是</span>
          </p>
      </div>

      <div className={'note-card'}>
          <div>
              <p style={{fontSize:'16px',color:'#fff'}}>{detail.title}</p>
              <p style={{color:'#fff'}}>{detail.content}</p>
              <p style={{color:'#fff'}}>{detail.reference}</p>
          </div>

          <div>
              <p style={{width:'100%',height:'1px',backgroundColor:'#fff'}}></p>
              <p style={{color:'#fff'}}>{detail.occupation}，{detail.author}</p>
          </div>
      </div>







  </div>;
};

export default NoteDetail;
