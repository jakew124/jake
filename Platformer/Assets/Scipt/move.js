#pragma strict

//Player Stats
private var rb: Rigidbody2D;
private var grounded:boolean = false;
private var animator: Animator;
private var currentDir = "right";
private var lastDir = "";

public var speed: int;
public var jump: int;

function Start () {

	//Find Player's Rigidbody component
	rb = GetComponent.<Rigidbody2D>();

	//Finds Player's Animator controller
	animator = GetComponent.<Animator>();
}
//Use fixed update for Rigidbody movement
function FixedUpdate () {

	//Get input from axes
	var moveHorizontal = Input.GetAxis("Horizontal");
	var moveVertical = Input.GetAxis("Vertical");
	//Debug.Log(moveHorizontal);
	var movement = Vector2( moveHorizontal, 0);

	//Debug.Log("grounded =" + grounded + ", moveVertical = " + moveVertical);


	//Check if player is touching the ground


	if(rb.velocity.magnitude < 10){
		rb.AddForce( movement * speed * Time.deltaTime );
		//Debug.Log( rb.velocity.magnitude);
	}

	//flip character to face direction
	var sr = GetComponent.<SpriteRenderer>();
	if(moveHorizontal > .05){
		animator.SetInteger("State",1);
		sr.flipX = true;
		currentDir = "right";


	} else if (moveHorizontal < -.05){
		animator.SetInteger("State",1);
		sr.flipX = false;
		currentDir = "left";

	}else if(grounded){
		animator.SetInteger("State", 0);
	}
	if(moveVertical > 0 && grounded) { 
		rb.AddForce( transform.up * jump, ForceMode2D.Impulse);
		animator.SetInteger("State",2);

	}

	//Compare last direction with current direction
	if( currentDir != lastDir){
		rb.velocity.x = 0;
	}
	lastDir = currentDir;
		
}

function OnCollisionEnter2D (col: Collision2D) {

	var norm = col.contacts[0].normal;
	if(norm.y > 0) {
			grounded = true;
			animator.SetInteger("State", 0);
	}
	//Debug.Log("grounded");
}

function OnCollisionExit2D (col: Collision2D) {

	//Debug.Log("grounded");
	grounded = false;
}