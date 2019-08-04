import request from './request'
const api = {
	
};

api.get = function(url,params){
	return request({
	    url,
	    method: 'get',
	    data:params
	  })
	
}

api.post = function(url,params){
	return request({
	    url,
	    method: 'post',
	    data:params
	  })
	
}

export default api;