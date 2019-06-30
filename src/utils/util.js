/**
 * 一些工具方法
 * Created by admin on 2017/10/21.
 */
// import Vue from 'vue'
//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr === document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//调用本地存储
export function getLocal(name){
  return window.localStorage.getItem(name);
}

//保存本地存储调用
export function saveLocal(name, value){
  window.localStorage.setItem(name,value);
}

//清除本地存储调用
export function delLocal(name){
  window.localStorage.removeItem(name);
}

//转换时间格式
export function transTimeToBack(row){
  return row.split('.')[0].replace('T',' ');
}



/**
 * renderBtn 渲染按钮
 * @param h
 * @param params
 * @param bdata 按钮的数据
 * @param rule(name: 状态，right：开启的结果，wbtn：开启的提示)选填
 * @returns {Promise}
 */
export function renderBtn(h, params, bdata ,rule = {btns:[{class: '',type: '',name:'',right: '',wbtn: ''}],size: 2}){
  let BtnArr = [];
  const that = this;
  if(bdata.length < 4){
    BtnArr = loopBtn(that, h, params, bdata,rule);
  }else{
    BtnArr = loopBtn(that, h, params, bdata.slice(0,rule.size), rule);
    let moreBtn = [];
    bdata.slice(rule.size).forEach((val)=>{
      let color = val.color,
          name = val.name;
      rule.btns.forEach(btn=>{
        if(val.class === btn.class && params.row[btn.name] === btn.right){
          color = btn.type;
          name = btn.wbtn;
        }
      });
      const btn = h('DropdownItem',[h('Button',{
        props: {
          type: color
        },
        on: {
          click: ()=>{
            this[val.class](params.row)
          }
        }
      },name)]);
      moreBtn.push(btn);
    });
    BtnArr.push(h('Dropdown',{
      attrs:{
        trigger: 'click'
      }
    },[
      h('Button',{
        props: {
          type: 'info'
        }
      },[
        '更多 ',
        h('Icon',{
          props: {
            type: 'arrow-down-b'
          }
        })
      ]),
      h('DropdownMenu',{
        slot: 'list'
      }, moreBtn)
    ]));
  }
  return BtnArr;
}

export function loopBtn(proto, h, params, bdata,rule){
  let res = [];
  bdata.forEach((val)=>{
    let color = val.color,
      name = val.name;
    rule.btns.forEach(btn=>{
      if(val.class === btn.class && params.row[btn.name] === btn.right){
        color = btn.type;
        name = btn.wbtn;
      }
    });
    const btn = h('Button',{
      props: {
        type: color
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: ()=>{
          proto[val.class](params.row)
        }
      },
    },name);
    res.push(btn);
  });
  return res;
}
/**
 * 转换数字状态成中文
 * @param data 初始数据（object）
 * @param key 转换的键值（string）
 * @param val1 1对应的字符（string）
 * @param val2 0对应的字符（string）
 * @returns data(object);
 */
export function transText(data,key,val1,val2){
  data.forEach((val)=>{
    val[key] = (val[key] === 0)?val1:val2;
  });
  return data;
}
