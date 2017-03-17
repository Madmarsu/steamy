import { Router } from 'express'
import { models } from '../config/constants'
// import BaseApi from './base-api'

let api = Router();

Object.keys(models).forEach((k) => {
	let model = models[k]
	let schema = require('./' + model.name.toLowerCase())
	if(model.useCustomRoutes){
		let customRoutes = require('../custom-routes/' + model.name.toLowerCase() + '-routes').default
		if(customRoutes){
			Object.keys(customRoutes).forEach(k => {
				let route = customRoutes[k]
				console.log(route)
				api.route(route.path)[route.reqType](route.method)
			})
		}
	}

});

export default api