class EnemyList {
	constructor(num) {
		this.length = num;
		this.enemy = [];
		
		for (var i = 0; i < this.length; i++) {
			this.enemy.push(new Enemy(i, i));
		}
	}
	
	update() {
		for (var i = this.enemy.length-1; i >= 0; i--) {
			var e = this.enemy[i];
			player.checkHit(e.projectiles, player);
			
			e.checkHit(player.projectiles, e);			
			e.show();
			
			if(e.dead) {
				this.length -= 1;
				this.enemy.splice(i,1);
			}
		}
	}
}