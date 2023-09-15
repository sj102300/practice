import { Router } from "express";

class ReviewController{
    router;
    path = '/reviews'

    reviews = [
    {
        id:1,
        author: 'sj',
        content: 'so gooood'
    }
    ];

    constructor(){
        this.router = Router();
        this.init();
    }


    init(){
        this.router.get('/', this.getReviews.bind(this));
        this.router.get('/:id', this.getReview.bind(this));
        this.router.post('/', this.createReview.bind(this));
        this.router.patch('/:id', this.updateReview.bind(this));
        this.router.delete('/:id', this.deleteReview.bind(this));
    }


    getReviews(req, res){
        res.status(209).json({ reviews: this.reviews })
    }

    getReview(req, res){
        let id = Number(req.params.id);
        let target = this.reviews.find((review)=> { return review.id === id });
        res.status(200).json({ target });
    }

    createReview(req,res){
        this.reviews.push({
            id: new Date().getTime(),
            author: req.body.author,
            content: req.body.content
        })
        res.status(200).json({reviews: this.reviews});
    }

    updateReview(req,res){
        let id = Number(req.params.id);
        let targetIdx = this.reviews.findIndex((review) => { return review.id === id});
        if(targetIdx === -1) {
            return res.status(404).json({});
        }
        if(this.reviews[targetIdx].author !== req.body.author){
            return res.status(401).json({});
        }
        this.reviews[targetIdx].content = req.body.content;
        res.status(204).json({ review: this.reviews[targetIdx] })
    }
    
    deleteReview(req,res){
        
        let id = Number(req.params.id);
        let targetIdx = this.reviews.findIndex((review) => { return review.id === id});
        if(targetIdx === -1) {
            return res.status(404).json({});
        }
        if(this.reviews[targetIdx].author !== req.body.author){
            return res.status(401).json({});
        }
        this.reviews = this.reviews.filter((review)=>{
            return review.id !== id;
        })
    }

}

const reviewController = new ReviewController();
export default reviewController;