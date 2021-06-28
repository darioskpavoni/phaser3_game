import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload()
    {
        this.load.image('sky','assets/sky.png');
        this.load.image('ground','assets/platform.png');
        this.load.image('star','assets/star.png');
        this.load.image('bomb','assets/bomb.png');
    }

    create()
    {
        
    }

    update()
    {

    }
}
