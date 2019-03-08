class RegUtils {
  constructor() {
    this.name = 'reg';
    this.Num = /^[1-9]{1}[0-9]*$/; // 有意义的数值
    this.Number = /^[0-9]{1}[0-9]*$/; // 数字就行
    this.Qq = /^\d{6,}$/;
    this.Tel = /^1\d{10}$/;
    (this.Email = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
    (this.accountExp = /^[a-zA-Z]{1}[0-9a-zA-Z_]{5,15}$/);
    this.password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/; // 包括数字和字母,8-20位
    this.IpCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    this.Price = /^(([1-9]\d*)|0)(\.\d{0,2})?$/;
    this.NumEng = /^[A-Za-z0-9]+$/; // 数字和字母
    this.ChineseEng = /^[A-Z a-z\u4e00-\u9fa5]+$/; // 英文(包括空格)和汉字
    this.specialReg = /^[\u4e00-\u9fa5-/& '.a-zA-Z0-9]+$/; // 中文,字母，数字，-/& '. 字符
    this.Hundred = /^[1-9]{1}[0-9]{0,1}$/;
    this.TenHousand = /^[1-9]{1}[0-9]{0,4}$/;
    this.TenRate = /^([1-9]{1})(\.\d{1})?$/;
    this.tagA = /<a\b[\sa-zA-Z'"=]*href=[a-zA-Z"']*\b[\sa-zA-Z'"=]*>[\w\W]*<\/a>/;
  }

  booleanContainTag = (tagName, str) => {
    return this[`tag${tagName.toUpperCase()}`].test(str);
  };
}
export default new RegUtils();
