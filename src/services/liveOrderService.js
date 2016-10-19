import redis from 'redis';

const PLACE_ORDER = 'placeOrder';
/**
* live order service
**/
class liveOrderService {
	constructor(io) {
		this.io = io;
		this.io.on('connection', this.onSocketIoConnection.bind(this));
		
		let subcriber = redis.createClient();
		subcriber.on('subscribe', this.onSubscribe.bind(this));
		subcriber.on('message', this.onMessage.bind(this));
		subcriber.subscribe(PLACE_ORDER);
	}

	onSocketIoConnection(socket) {

	}

	onSubscribe(changel, count) {
		console.info('--- subcriber changel: %s, count: %d ---', changel, count);
	}

	onMessage(changel, message) {
		console.info('--- get message, changel is: %s, message is: %s ---', changel, message);
		if (changel === PLACE_ORDER) {
			this.io.emit(PLACE_ORDER, message);
		}
	}
}

export default liveOrderService;
