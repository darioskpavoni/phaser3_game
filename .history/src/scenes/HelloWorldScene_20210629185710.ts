import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    private platforms?: Phaser.Physics.Arcade.StaticGroup; // ? ->optional member in the interface, could be undefined
    private player?: Phaser.Physics.Arcade.Sprite; 
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

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
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key:'dude',frame: 4}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude',{
                start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        // Adding collision between player and ground
        this.physics.add.collider(this.player,this.platforms);


        // Creating cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play('left',true);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play('right',true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play('turn'.true);
        }

    }
}
