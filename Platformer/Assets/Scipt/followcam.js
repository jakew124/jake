#pragma strict

public var target: GameObject;

function Start () {
	
}

function LateUpdate () {

	transform.position.x = target.transform.position.x;

}