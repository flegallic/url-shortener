var express = require('express');
var router = express.Router();
//check valid url format
const { body, validationResult } = require('express-validator');
const isValidUrl = urlString => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
//module to generate a key value
const generateKey = require('generate-api-key');
//limit repeated requests to public APIs 
const rateLimit = require('express-rate-limit');
const createRateLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 6, // Limit each IP to 100 requests per window
	standardHeaders: true, // Return rate limit info in the RateLimit-* headers
	legacyHeaders: false, // Disable the X-RateLimit-* headers
  message: "message", 
    handler: function(req,res) {
      res.render('index', {err:"Too many request sended from this IP, please try again after an hour"});
    },
});

//root page
router.get('/', function(req,res) {
  res.render('index');
});
//post request from form
router.post('/', createRateLimit, body('urlshortener').isLength({ min: 4 }), (req,res) => {
  const errors = validationResult(req);
  const userUrlRequest = req.body.urlshortener;
  const userUrlSplit = userUrlRequest.split('//');

    if (!errors.isEmpty()) {
      res.render('index', {err:"Oops! Someting wet wrong..."});
    }
    else if(isValidUrl(userUrlRequest) === false){
      res.render('index', {err:"Oops! Please enter a valid url..."});
    }
    else{
      let urlParams = generateKey({ method: 'base32', max: 6, dashes: false }).substr(0, 6).toString().toLowerCase();
      const urlUser = userUrlSplit[0] + "//myurl" + "/" + urlParams;
      res.render('index', {msg:"Success! Your link has been generated: ", url:urlUser, urlRoot:userUrlRequest});
    }
    res.end();
});
//default url
router.get('*', (req,res) => { res.render('index', {err:"404, Oops! this page not found..."}); });
router.post('*', (req,res) => { res.render('index', {err:"404, Oops! this page not found..."}); });

module.exports = router;
