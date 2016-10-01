#pragma strict

//Prefab for your platform
public var platform: GameObject;

//How many platforms can spawn
public var numPlatforms = 0;


//Block spawn parameters
private var minX = -8;
private var maxX = 8;
private var minY = -3;
private var maxY = 4;

private var Pos = new Array();

function Start () {

		buildLevel(numPlatforms);
}


function Update () {

}

function buildLevel (num: int){

	for(var i = 0; i < num; i++){
		//X & Y Variables
		var Xrand = Random.Range(minX, maxX);
		var Yrand = Random.Range(minY, maxY);

		var match = false;
		for ( var value: String in Pos){
			var platformPos = Xrand + "," + Yrand;
			if(platformPos == value){
				match = true;
			}
			
		}

		if(match) {
			i--;
			}else{
				Pos.Push( platformPos);
				Debug.Log(Pos.length);
						Instantiate( platform, Vector2( Xrand, Yrand), Quaternion.identity );

		}

		// The Xrand is unique
		// Push it into the Xpos array


	}
}