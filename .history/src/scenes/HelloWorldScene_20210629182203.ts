import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    private platforms?: Phaser.Physics.Arcade.StaticGroup; // ? ->optional member in the interface, could be undefined
    private player?: Phaser.Physics.Arcade.Sprite; 

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
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight:48 }
            );
    }

    

    create()
    {
        this.add.image(400,300,'sky');
        this.add.image(400,300,'star');

        this.platforms = this.physics.add.staticGroup(); // using the Arcade Physics system

        // Creating platforms
        const ground = this.platforms.create(400,568,'ground') as Phaser.Physics.Arcade.Sprite;

        ground
            .setScale(2)
            .refreshBody()

        this.platforms.create(600, 400,'ground');
        this.platforms.create(50, 250,'ground');
        this.platforms.create(750, 220,'ground');

        // Creating player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2); // Player will bounce in a certain way
        this.player.setCollideWorldBounds(); // Player WILL collide with world boundaries

        // Creating animations
        this.anims.create({
            key: 'left',
            frames: [{key:'dude', frame: 4}],
            frameRate: 20
        })

    }

    update()
    {

    }
}
