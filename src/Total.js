class Total {
  constructor() {
    this.Revenue = 0;
    this.Cost = 0;
    this.Profit = 0;
  }

  convertToStrings() {
    this.Revenue = this.Revenue.toFixed(2);
    this.Cost = this.Cost.toFixed(2);
    this.Profit = this.Profit.toFixed(2);
  }
}

module.exports = Total;
