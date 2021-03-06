import React, { Component } from 'react';
import axios from 'axios';
import fakeData from '../Assets/data';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import $ from 'jquery'
class Detail extends Component {
  Data = {
    all : fakeData
  }
  backupData = fakeData;
  componentDidMount(){
    axios.get('https://ywc15.ywc.in.th/api/interview')
    .then( response => {
        this.Data.all = response.data;
        this.backupData = response.data.slice();
        this.Data.all = _.sortBy(this.Data, function(o) { return o.interviewRef; })[0];
        const content = _.filter(response.data, ['major', 'content'])
        this.Data.content = _.sortBy(content, function(o) { return o.interviewRef; })
        const design = _.filter(response.data, ['major', 'design'])
        this.Data.design = _.sortBy(design, function(o) { return o.interviewRef; })
        const marketing = _.filter(response.data, ['major', 'marketing'])
        this.Data.marketing = _.sortBy(marketing, function(o) { return o.interviewRef; })
        const programming = _.filter(response.data, ['major', 'programming'])
        this.Data.programming = _.sortBy(programming, function(o) { return o.interviewRef; })
        this.forceUpdate();
    })
  }
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.onExportToCSV = this.onExportToCSV.bind(this);
    this.createCustomExportCSVButton = this.createCustomExportCSVButton.bind(this);
  }
  search = function(e){
    const input = e.target.value.toLowerCase();
    console.log(input)
    if( input === '' || input === undefined || input === null){
      $('#major-content,#major-design,#major-marketing,#major-programming').show()
      $('#major-all').hide()
      this.Data.all = this.backupData.slice()
    }else{
      $('#major-content,#major-design,#major-marketing,#major-programming').hide()
      $('#major-all').show()

      this.Data.all = _.filter(this.Data.all, (o) =>{ return o.firstName.indexOf(input)===0 || o.lastName.indexOf(input)===0 || o.major.indexOf(input)===0 || o.interviewRef.toLowerCase().indexOf(input)===0 })
    }
    if(this.Data.all.length === 1){
      $('span[name="interviewRef"]').text(this.Data.all[0].interviewRef);
      $('span[name="firstname"]').text(this.Data.all[0].firstName);
      $('span[name="lastname"]').text(this.Data.all[0].lastName);
      $('span[name="major"]').text(this.Data.all[0].major);
      var modal = document.getElementById('modal');
      modal.style.display = "block";
      var span = document.getElementsByClassName("close-btn")[0];
      span.onclick = function() {
          modal.style.display = "none";
      }
      window.onclick = function(event) {
          if (event.target === modal) {
              modal.style.display = "none";
          }
      }
    }
    this.forceUpdate();
  }
  onExportToCSV = function(row){
    return this.backupData;
  }
  createCustomExportCSVButton = (onClick) => {
    return (
      <button className="export-btn btn btn-success" onClick={ onClick }><i className="fa fa-download" aria-hidden="true"></i> ส่งออก CSV</button>
    );
  }
  render() {
    const onRowClick = function(e){ 
      $('span[name="interviewRef"]').text(e.interviewRef);
      $('span[name="firstname"]').text(e.firstName);
      $('span[name="lastname"]').text(e.lastName);
      $('span[name="major"]').text(e.major);
      var modal = document.getElementById('modal');
      modal.style.display = "block";
      var span = document.getElementsByClassName("close-btn")[0];
      span.onclick = function() {
          modal.style.display = "none";
      }
      window.onclick = function(event) {
          if (event.target === modal) {
              modal.style.display = "none";
          }
      }
    }
    const contentOptions = {
      onRowClick: onRowClick,
      onExportToCSV: this.onExportToCSV,
      exportCSVBtn: this.createCustomExportCSVButton
    };
    const options = {
      onRowClick: onRowClick
    };
    return (
      <div className="Announce">
        <div className="majors-sticky">
          <div className="major-sticky major-sticky-content">
            <img src="/images/content.png" alt=""/>
            <div><h2 className="font-200 font-2rem">Web Content</h2></div>
          </div>
          <div className="major-sticky major-sticky-design">
            <img src="/images/design.png" alt=""/>
            <div><h2 className="font-200 font-2rem">Web Design</h2></div>
          </div>
          <div className="major-sticky major-sticky-marketing">
            <img src="/images/marketing.png" alt=""/>
            <div><h2 className="font-200 font-2rem">Web Marketing</h2></div>
          </div>
          <div className="major-sticky major-sticky-programming">
            <img src="/images/programming.png" alt=""/>
            <div><h2 className="font-200 font-2rem">Web Programming</h2></div>
          </div>
        </div>
        <h2 className="font-2rem font-200">รายชื่อผู้ผ่านเข้ารอบสัมภาษณ์</h2>
        <div className="input-group search sticky-top content-block">
          <span className="input-group-addon"><i className="fa fa-search" aria-hidden="true"></i></span>
          <input type="text" className="form-control search-box" placeholder="ค้นหาด้วย ชื่อ,สาขา" onChange={this.search}/>
        </div>
          
        <div className="content-block">
          <div id="major-content">
            <div className="major-logo">
              <img src="/images/content.png" alt=""/>
              <div><h2 className="font-200 font-2rem">Web Content</h2></div>
            </div>
            <BootstrapTable data={this.Data.content} options={ contentOptions } hover exportCSV>
              <TableHeaderColumn isKey={ true } dataField='interviewRef' dataAlign='center' dataSort>รหัส</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName' dataAlign='center' dataSort>ชื่อ</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName' dataAlign='center' dataSort>นามสกุล</TableHeaderColumn>
              <TableHeaderColumn dataField='major' dataAlign='center'>สาขา</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div id="major-design">
            <div className="major-logo">
              <img src="/images/design.png" alt=""/>
              <div><h2 className="font-200 font-2rem">Web Design</h2></div>
            </div>
            <BootstrapTable data={this.Data.design} options={ options } hover>
              <TableHeaderColumn isKey dataField='interviewRef' dataAlign='center' dataSort>รหัส</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName' dataAlign='center' dataSort>ชื่อ</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName' dataAlign='center' dataSort>นามสกุล</TableHeaderColumn>
              <TableHeaderColumn dataField='major' dataAlign='center'>สาขา</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div id="major-marketing">
            <div className="major-logo">
              <img src="/images/marketing.png" alt=""/>
              <div><h2 className="font-200 font-2rem">Web Marketing</h2></div>
            </div>
            <BootstrapTable data={this.Data.marketing} options={ options } hover>
              <TableHeaderColumn isKey dataField='interviewRef' dataAlign='center' dataSort>รหัส</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName' dataAlign='center' dataSort>ชื่อ</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName' dataAlign='center' dataSort>นามสกุล</TableHeaderColumn>
              <TableHeaderColumn dataField='major' dataAlign='center'>สาขา</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div id="major-programming">
            <div className="major-logo">
              <img src="/images/programming.png" alt=""/>
              <div><h2 className="font-200 font-2rem">Web Programming</h2></div>
            </div>
            <BootstrapTable data={this.Data.programming} options={ options } hover>
              <TableHeaderColumn isKey dataField='interviewRef' dataAlign='center' dataSort>รหัส</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName' dataAlign='center' dataSort>ชื่อ</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName' dataAlign='center' dataSort>นามสกุล</TableHeaderColumn>
              <TableHeaderColumn dataField='major' dataAlign='center'>สาขา</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div id="major-all">
            <h2 className="font-200 font-2rem">ผลการค้นหา..</h2>
            <BootstrapTable data={this.Data.all} options={ options } hover>
              <TableHeaderColumn isKey dataField='interviewRef' dataAlign='center' dataSort>รหัส</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName' dataAlign='center' dataSort>ชื่อ</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName' dataAlign='center' dataSort>นามสกุล</TableHeaderColumn>
              <TableHeaderColumn dataField='major' dataAlign='center'>สาขา</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>

        <div id="modal" className="modal">
          <div className="modal-content text-center">
            <div className="modal-header text-center">
              <h2 className="font-2rem font-200">ขอแสดงความยินดี</h2>
            </div>
            <div className="modal-body">
              <p className="emphasize font-2rem font-200">
                <span name="interviewRef"></span>&nbsp;&nbsp; 
                <span name="firstname"></span>&nbsp;&nbsp;
                <span name="lastname"></span>&nbsp;&nbsp;
                <span name="major"></span>&nbsp;&nbsp;
                </p>
              <p>ได้ผ่านเข้าสู่รอบสัมภาษณ์โครงการ Young Webmaster Camp#15<sup>th</sup></p>
            </div>
            <div className="modal-footer text-center">
              <button className="close-btn">ปิดหน้าต่าง</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
$(document).ready(function() {
  $(window).scroll(function(event) {
    if( $(window).scrollTop() === ($('.search').position()).top -10 ){
      $('.search').removeClass('content-block')
    }else $('.search').addClass('content-block')

    if( $(window).scrollTop() >= ($('#major-content').position()).top -100
      && $(window).scrollTop() <= (($('#major-content').position()).top + $('#major-content').height() )) {
      $('.major-sticky-content').addClass('logo-sticky')
    }else $('.major-sticky-content').removeClass('logo-sticky')

    if( $(window).scrollTop() >= ($('#major-design').position()).top
      && $(window).scrollTop() <= (($('#major-design').position()).top + $('#major-design').height() )) {
      $('.major-sticky-design').addClass('logo-sticky')
    }else $('.major-sticky-design').removeClass('logo-sticky')

    if( $(window).scrollTop() >= ($('#major-marketing').position()).top
      && $(window).scrollTop() <= (($('#major-marketing').position()).top + $('#major-marketing').height() )) {
      $('.major-sticky-marketing').addClass('logo-sticky')
    }else $('.major-sticky-marketing').removeClass('logo-sticky')

    if( $(window).scrollTop() >= ($('#major-programming').position()).top
      && $(window).scrollTop() <= (($('#major-programming').position()).top + $('#major-programming').height() )) {
      $('.major-sticky-programming').addClass('logo-sticky')
    }else $('.major-sticky-programming').removeClass('logo-sticky')
  });
});
export default Detail;
