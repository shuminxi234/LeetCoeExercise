//constructor a random LinkedNode
class Node{
    constructor(val){
        this.val=val;
        this.next=null;
    }
}

//question138. 随机链表的复制
class RandomLinked{
    constructor(){
        this.random=null;
        this.head=new Node('head');
        //this.currentNode='';
    }
}
function genRandomList(values,randomIndx){}
function copyRandomList(head){
    if(!head)return null;
    //step1;insert
    let current=head;
    while(current){
        let newNode=new RandomLinked(current.val);
        newNode.next=current.next;
        current.next=newNode;
        current=newNode.next;
    }
    //step2;copy random Links;
    current=head;
    while(current){
        if(current.random){
            current.next.random=current.random.next;
        }
        current=current.next.next;
    }
    //step3;seprate two random links
    current=head;
    let newHead=head.next;
    let copyCurrent=newHead;
    while(current){
        current.next=current.next.next;
        if(copyCurrent.next){
            copyCurrent.next=copyCurrent.next.next;
        }
        current=current.next;
        copyCurrent=copyCurrent.next;
    }
    return newHead;
}

