export default {
    formateCurrency: function(num){
        return '$' + Number(num.toFixed(2)).toLocaleString() + ' ';
    }
}